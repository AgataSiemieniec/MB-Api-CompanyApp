const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  it('should throw an error if no arg', () => {
    const emp = new Employee({}); 

    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if "" is not a string', () => {

    const cases = [
      {firstName: {}, lastName: {}, department: {}},
      {firstName: [], lastName: [], department: []},
    ];
    for(let variant of cases) {
      const emp = new Employee({variant}); 

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }

  });

  it('should throw an error if any arg is missing', () => {

    const variant1 = {firstName: 'Lorem'};
    const variant2 = {lastName: 'Ipsum'};
    const variant3 = {department: 'HR'};
    const variant4 = {firstName: 'Lorem', lastName: 'Ipsum'};
    const variant5 = {firstName: 'Lorem', department: 'HR'};
    const variant6 = {lastName: 'Ipsum', department: 'HR'};

    const cases = [variant1, variant2, variant3, variant4, variant5, variant6];
    for(let variant of cases) {
      const emp = new Employee({variant}); 

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  
  });

  it('should throw good if all arg are ok', () => {

    const cases = [
      {firstName: 'Lorem', lastName: 'Ipsum', department: 'HR'},
      {firstName: 'lorem', lastName: 'ipsum', department: 'hr'},
    ];
    for(let variant of cases) {
      const emp = new Employee({variant}); 

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }

  });

});