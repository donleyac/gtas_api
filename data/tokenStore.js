var records = [
    { id: 1, username: 'jack', token: '123456789', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] },
    { id: 2, username: 'jill', token: 'abcdefghi', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

export function findByToken(token, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      if (records[i].token === token) {
        return cb(null, records[i]);
      }
    }
    return cb(null, null);
  });
}
