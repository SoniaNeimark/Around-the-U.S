const cardsCollection = '/cards';
const usersCollection = '/users';
const card = `${cardsCollection}/:id`;
const cardLikes = `${card}/likes`;
const user = `${usersCollection}/:id`;
const ownerProfile = `${usersCollection}/me`;
const ownerAvatar = `${ownerProfile}/avatar`;
const pathsObject = {
  cardsCollection,
  usersCollection,
  card,
  cardLikes,
  user,
  ownerProfile,
  ownerAvatar,
};

module.exports = pathsObject;
