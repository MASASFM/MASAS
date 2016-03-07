from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
	"""
	Custom permission to only allow owners of an object to edit it.
	"""

	def has_object_permission(self, request, view, obj):
		# Read permissions are allowed to any request,
		# so we'll always allow GET, HEAD or OPTIONS requests.
		if request.method in permissions.SAFE_METHODS:
			return True

		# import ipdb
		# ipdb.set_trace()
		# Write permissions are only allowed to the owner of the snippet.
		return obj.trackArtist == request.user

class IsUserProfileOwnerOrReadOnly(permissions.BasePermission):
	"""
	Custom permission to only allow owners of an object to edit it.
	"""

	def has_object_permission(self, request, view, obj):
		# Read permissions are allowed to any request,
		# so we'll always allow GET, HEAD or OPTIONS requests.
		

		if request.method in permissions.SAFE_METHODS:
			return True

		# import ipdb
		# ipdb.set_trace()
		# Write permissions are only allowed to the owner of the snippet.
		return obj.user == request.user

class IsUserOrReadOnly(permissions.BasePermission):
	"""
	Custom permission to only allow owners of an object to edit it.
	"""

	def has_object_permission(self, request, view, obj):
		# Read permissions are allowed to any request,
		# so we'll always allow GET, HEAD or OPTIONS requests.
		

		if request.method in permissions.SAFE_METHODS:
			return True

		# import ipdb
		# ipdb.set_trace()
		# Write permissions are only allowed to the owner of the snippet.
		return obj.pk == request.user.pk

class isLikesOwnerOrReadOnly(permissions.BasePermission):
	"""
	Custom permission to only allow owners of an object to edit it.
	"""

	def has_object_permission(self, request, view, obj):
		# Read permissions are allowed to any request,
		# so we'll always allow GET, HEAD or OPTIONS requests.
		

		if request.method in permissions.SAFE_METHODS:
			return True

		# Write permissions are only allowed to the owner of the snippet.
		return obj.user == request.user