function makeFriendsList(friends) {
    const body = document.querySelector('body');
    const friendsList = document.createElement('ul');
    body.append(friendsList);
  
    friends.forEach(friend => {
      const newFriend = document.createElement('li');
      newFriend.textContent = `${friend.firstName} ${friend.lastName}`;
      friendsList.append(newFriend);
    });
    return friendsList
}
