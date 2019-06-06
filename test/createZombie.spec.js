const { expect } = require('chai');
const request = require('supertest');
/* global it, describe */
describe('API — teamsByGame', () => {
  const server = request('http://localhost:3000');

  it('GET /games/{gameId}/teams', (done) => {
    server.get('/games/game-123/teams')
      .expect(200)
      .end((error, result) => {
        if (error) return done(error);
        expect(result.body).to.deep.eq([
          { idTeam: 'team-123', gameId: 'game-123' },
        ]);
        return done();
      });
  });
});
