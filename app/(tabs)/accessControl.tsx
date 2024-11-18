import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import useFetchAccessRequests from '@/hooks/accessHooks/useFetchAccessRequest';
import useApproveAccessRequest from '@/hooks/accessHooks/useApproveAccessRequest';

interface AccessRequest {
  __v: number;
  _id: string;
  accessApproved: boolean;
  createdAt: string;
  role: string;
  updatedAt: string;
  userId: {
    _id: string;
    email: string;
    name: string;
    phoneNumber: string;
  };
}

const AccessControl = () => {
  const { user } = useAuth();
  const { accessRequests, loading: fetchLoading, refetchAccessRequests } = useFetchAccessRequests();
  const { loading: approveLoading, approveAccessRequest } = useApproveAccessRequest(() => {
    refetchAccessRequests();
    Alert.alert("Success", "Access request approved successfully");
  });

  const isAdmin = user?.role === 'ADMIN';

  if (!isAdmin) {
    return (
      <View className="flex-1 bg-gray-50 p-4">
        <View className="bg-white p-5 rounded-xl items-center">
          <Text className="text-xl font-bold text-red-500 mb-2">Access Denied</Text>
          <Text className="text-gray-600 text-center">
            You do not have permission to view this page.
          </Text>
        </View>
      </View>
    );
  }

  const handleApproveAccess = async (accessId: string, role: string) => {
      console.log(accessId);
    await approveAccessRequest({ accessId, role });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderRequestCard = (request: AccessRequest) => (
    <View 
      key={request._id} 
      className="bg-white rounded-xl p-4 mb-4 shadow-sm"
    >
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-gray-800">
          {request.userId.name}
        </Text>
        <View 
          className={`px-3 py-1 rounded-full ${
            request.accessApproved 
              ? 'bg-green-100' 
              : 'bg-yellow-100'
          }`}
        >
          <Text 
            className={`text-xs font-medium ${
              request.accessApproved 
                ? 'text-green-800' 
                : 'text-yellow-800'
            }`}
          >
            {request.accessApproved ? 'Approved' : 'Pending'}
          </Text>
        </View>
      </View>

      <View className="space-y-2 mb-4">
        <View className="flex-row">
          <Text className="w-24 text-gray-500">Email:</Text>
          <Text className="flex-1 text-gray-800">{request.userId.email}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-24 text-gray-500">Phone:</Text>
          <Text className="flex-1 text-gray-800">{request.userId.phoneNumber}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-24 text-gray-500">Role:</Text>
          <Text className="flex-1 text-gray-800">{request.role}</Text>
        </View>
        <View className="flex-row">
          <Text className="w-24 text-gray-500">Requested:</Text>
          <Text className="flex-1 text-gray-800">{formatDate(request.createdAt)}</Text>
        </View>
      </View>

      {!request.accessApproved && (
        <TouchableOpacity
          className={`bg-blue-500 py-3 rounded-lg items-center ${
            approveLoading ? 'opacity-50' : 'opacity-100'
          }`}
          onPress={() => handleApproveAccess(request._id, request.role)}
          disabled={approveLoading}
        >
          {approveLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white font-semibold text-base">
              Approve Access
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl
            refreshing={fetchLoading}
            onRefresh={refetchAccessRequests}
          />
        }
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Access Management
        </Text>
        
        {fetchLoading ? (
          <View className="items-center justify-center py-10">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        ) : accessRequests.length === 0 ? (
          <Text className="text-center text-gray-600 text-base py-10">
            No pending access requests.
          </Text>
        ) : (
          accessRequests.map(renderRequestCard)
        )}
      </ScrollView>
    </View>
  );
};

export default AccessControl;