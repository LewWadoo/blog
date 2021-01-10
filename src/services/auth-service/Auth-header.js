export default function authHeader(token) {
  return { Authorization: 'Token ' + token };
}
