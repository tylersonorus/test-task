class EntityTools {
  entityList = [];
  updateEntities(data) {
    if (data && data.length > 0) {
      this.entityList = data;
    }
  }

  getEntities() {
    return this.entityList;
  }

  sumParams(column) {
    return this.entityList.reduce((acc, entity) => {
      if (entity) {
        return acc + entity[`param${column}`];
      } else return acc;
    }, 0);
  }

  maxParam(column) {
    console.log(this.entityList);
    let max = -1;
    this.entityList.forEach((entity) => {
      if (!entity) return;
      if (max < entity[`param${column}`]) max = entity[`param${column}`];
    });
    return max;
  }

  minParam(column) {
    let min = 1;
    this.entityList.forEach((entity) => {
      if (!entity) return;
      if (min > entity[`param${column}`]) min = entity[`param${column}`];
    });
    return min;
  }
}

export const entityTools = new EntityTools();
