""" contains a custom permission implementation """
from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """ custo permission to allow the admin only
        to edit, create, or delete
    """
    def has_permission(self, request, view):
        """ allows GET requests for all authenticated users """
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        
        return (request.user
                and request.user.is_authenticated
                and request.user.is_staff
        )