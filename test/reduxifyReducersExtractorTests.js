const chai = require('chai');
const expect = require('chai').expect;
const { testReducers, testReducers2, testReducers3, answerReducers, answerReducers2, answerReducers3 } = require('./fixtures/reduxifyReducerExtractorFixtures');
const { reduxify, Node } = require('./../lib/reduxify/src/reduxifyExtractor');
const output = reduxify.reducersExtractor(testReducers);
const output2 = reduxify.reducersExtractor(testReducers2);
const output3 = reduxify.reducersExtractor(testReducers3);

describe('reduxify.reducersExtractor', () => {

  it('should be a function', () => {
    expect(reduxify.reducersExtractor).to.be.a.function;
  })

  it('should return an object-typed instance of Node named "Reducers"', () => {
    expect(output).to.be.an('object');
    expect(output.constructor).to.deep.equal(Node);
    expect(output.name).to.deep.equal('Reducers');
  })


  it('should return a properly structured D3 hierarchical tree output for a given input that uses switch statements', () => {
    expect(output).to.deep.equal(answerReducers);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input that uses ternary statements', () => {
    expect(output2).to.deep.equal(answerReducers2);
  })

  it('should return a properly structured D3 hierarchical tree output for a given input that uses conditional statements', () => {
    expect(output3).to.deep.equal(answerReducers3);
  })

});

describe('"Reducers" node', () => {

  it('should have an array-typed property named children composed of object-typed Node(s)', () => {
    expect(output.children).to.be.an('array');
    expect(output.children[0]).to.be.an('object');
    expect(output.children[0].constructor).to.deep.equal(Node);
  })

  it('should have child nodes that each possess an array-typed property named children composed of object-typed Node(s)', () => {
    expect(output.children[0].children).to.be.an('array');
    expect(output.children[0].children[0]).to.be.an('object');
    expect(output.children[0].children[0].constructor).to.deep.equal(Node);
  })

});
