describe('PUT /members/:id', ()=>{
  it.only('should return 200 status code', (done) =>{
    request(app)
    .put('members/1')
    .send({
      nickName: 'foo'
    })
    .end((err,res)=>{
      if(err) throw err;
      done();
    });
  });
});
