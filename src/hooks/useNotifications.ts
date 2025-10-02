"use client";

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
// import { useQuery, useSubscription } from '@apollo/client/react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'booking';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export const useNotifications = () => {
  const { isAuthenticated, userType } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications for demonstration
  // Replace with actual GraphQL queries/subscriptions
  useEffect(() => {
    if (isAuthenticated) {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Booking Confirmed',
          message: 'Your booking for Photography Service has been confirmed for Dec 25, 2024.',
          type: 'booking',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          read: false,
          actionUrl: '/my-bookings'
        },
        {
          id: '2',
          title: 'Payment Received',
          message: 'Payment of $150 has been successfully processed.',
          type: 'success',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
          read: false,
        },
        {
          id: '3',
          title: 'Profile Updated',
          message: 'Your profile information has been successfully updated.',
          type: 'info',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          read: true,
        }
      ];

      // Add user type specific notifications
      if (userType === 'Vendor') {
        mockNotifications.unshift(
          {
            id: '4',
            title: 'New Booking Request',
            message: 'You have received a new booking request for your Photography service.',
            type: 'booking',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
            read: false,
            actionUrl: '/vendor/bookings'
          }
        );
      }

      if (userType === 'Admin') {
        mockNotifications.unshift(
          {
            id: '5',
            title: 'New Vendor Registration',
            message: 'A new vendor has registered and requires approval.',
            type: 'warning',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
            read: false,
            actionUrl: '/admin/vendors'
          }
        );
      }

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, userType]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    if (!newNotification.read) {
      setUnreadCount(prev => prev + 1);
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
  };
};
