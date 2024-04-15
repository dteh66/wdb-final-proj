Database schema:
Users: {user_uid (unique), name, email, wishlist_uid, friendslist = [list of users]}
Session_ids: {session_uid (unique), user_uid, random_string}
wishlist: {wishlist_uid (unique), user_uid, wish_list = [list of items]}
item: {item_uid (unique), name}
