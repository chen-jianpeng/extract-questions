export function randomNumbers(range) {
  return range[0] + Math.round(Math.random() * (range[1] - range[0]));
}

// 生成随机数字
export function generatedRandomNumbers(selected, range) {
  if (range[1] - range[0] + 1 === selected.length) {
    return;
  }

  let done = false;

  while (!done) {
    let _randomNumber = randomNumbers(range);
    if (!selected.includes(_randomNumber)) {
      done = true;
      return _randomNumber;
    }
  }
}
