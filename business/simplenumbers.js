class SimpleNumbers {

    static isEven(n) {
        return n % 2 === 0;
    }

    static numberFromInterval(min, max) {
        if(min >= max) {
            throw { name: "ArgumentInvalidError", message: "max value must be grater than min value" };
        }

        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

module.exports = SimpleNumbers;
