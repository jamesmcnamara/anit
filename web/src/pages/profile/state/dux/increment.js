// @flow

export default actionManager.create({
  help: 'increments',
  type: 'INCREMENT',
  creator: function increment(amt?: number = 0) { 
    return this.action(amt)
  },
  reducer: amt => mod('counter')(add(amt)),
})

