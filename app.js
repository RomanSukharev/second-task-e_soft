function deepCopy(obj, visited = new WeakMap()) {
  // Обрабатывать примитивные типы и null
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  // Обработать Date
  if (obj instanceof Date) {
      return new Date(obj);
  }

  // Обработать Set
  if (obj instanceof Set) {
      return new Set([...obj]);
  }

  // Обработать Map
  if (obj instanceof Map) {
      return new Map([...obj]);
  }

  // Обработать Arrays
  if (Array.isArray(obj)) {
      let copyArr = [];
      for (let i = 0; i < obj.length; i++) {
          copyArr.push(deepCopy(obj[i], visited));
      }
      return copyArr;
  }

  // Обработать Objects
  if (typeof obj === 'object') {
      // Check for cyclic references
      if (visited.has(obj)) {
          return visited.get(obj);
      }

      // Создать новый объект с тем же прототипом
      let newObj = Object.create(Object.getPrototypeOf(obj));

      // Добавить этот объект в карту посещенных для обработки циклических ссылок
      visited.set(obj, newObj);

      // Копировать свойства рекурсивно
      for (let key in obj) {
          newObj[key] = deepCopy(obj[key], visited);
      }

      return newObj;
  }
}

// Пример использования:
const obj1 = {
  a: 1,
  b: { c: 2 },
  d: [3, 4],
  e: new Date(),
  f: new Set([5, 6]),
  g: new Map([[7, 8]]),
};

// Создаем глубокую копию obj1
const obj2 = deepCopy(obj1);

// Изменяем obj2 и проверяем, что obj1 не изменился
obj2.a = 10;
obj2.b.c = 20;
obj2.d.push(30);
obj2.e.setDate(10);
obj2.f.add(7);
obj2.g.set(9, 10);

console.log(obj1);
console.log(obj2);
