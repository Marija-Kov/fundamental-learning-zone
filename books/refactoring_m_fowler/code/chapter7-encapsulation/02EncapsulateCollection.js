// Starter
(() => {
  class Person {
    constructor(name) {
      this._name = name;
      this._courses = [];
    }
    get name() {
      return this._name;
    }
    get courses() {
      return this._courses;
    }

    set courses(aList) {
      this._courses = aList;
    }
  }

  class Course {
    constructor(name, isAdvanced) {
      this._name = name;
      this._isAdvanced = isAdvanced;
    }
    get name() {
      return this._name;
    }
    get isAdvanced() {
      return this._isAdvanced;
    }
  }

  const aPerson = new Person("Keech");

  numAdvancedCourses = aPerson.courses.filter((c) => c.isAdvanced).length;

  // this function is supposed to exist, mock course name extraction:
  function readBasicCourseNames(filename) {
    return filename.split(",");
  }

  const basicCourses = "course1,course2,course3";

  const basicCourseNames = readBasicCourseNames(basicCourses);
  aPerson.courses = basicCourseNames.map((name) => new Course(name, false));

  // apparently, this violates encapsulation:
  for (const name of readBasicCourseNames(filename)) {
    // the user shouldn't be able to access the content of the courses like this:
    aPerson.courses.push(new Course(name, false));
  }
})();

// Refactored
(() => {
  class Person {
    constructor(name) {
      this._name = name;
      this._courses = [];
    }
    get name() {
      return this._name;
    }
    get courses() {
      // ensure it returns a copy
      return this._courses.slice();
    }
    addCourse(aCourse) {
      this._courses.push(aCourse);
    }
    removeCourse(
      aCourse,
      fnIfAbsent = () => {
        throw new RangeError("Course does not exist");
      }
    ) {
      const id = this._courses.indexOf(aCourse);
      if (index === -1) {
        fnIfAbsent();
      } else {
        this._courses.splice(id, 1);
      }
    }

    set courses(aList) {
      // ensure it puts a copy of the collection in the field
      this._courses = aList.slice();
    }
  }

  class Course {
    constructor(name, isAdvanced) {
      this._name = name;
      this._isAdvanced = isAdvanced;
    }
    get name() {
      return this._name;
    }
    get isAdvanced() {
      return this._isAdvanced;
    }
  }

  const aPerson = new Person("Keech");

  numAdvancedCourses = aPerson.courses.filter((c) => c.isAdvanced).length;

  // this function is supposed to exist, mock course name extraction:
  function readBasicCourseNames(filename) {
    return filename.split(",");
  }

  const basicCourses = "course1,course2,course3";

  const basicCourseNames = readBasicCourseNames(basicCourses);
  aPerson.courses = basicCourseNames.map((name) => new Course(name, false));

  for (const name of readBasicCourseNames(filename)) {
    // this is better
    aPerson.addCourse(new Course(name, false));
  }
})();
