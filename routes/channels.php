<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

Broadcast::channel('online', function (User $user) {
	return $user ? new \App\Http\Resources\UserResource($user) : null;
});

Broadcast::channel('message.user.{userId1}-{userId2}', function (User $user, int $userId1, int $userId2) {
    return $user && ($user->id === $userId1 || $user->id == $userId2) ? $user : null;
});

Broadcast::channel('message.group.{groupId}', function (User $user, int $groupId) {
    return $user && $user->groups->contains('id', $groupId) ? $user : null;
});


