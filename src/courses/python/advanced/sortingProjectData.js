export const sortingMasteryItems = [
  {
    label: '能追踪至少一种 O(n²) 排序每一轮确定了什么。',
    evidence: '例如冒泡每轮把最大值送到右侧，选择排序每轮选出剩余最小值。',
    retryHint: '回到冒泡或选择排序，用 5 个数字手写每一轮数组状态。',
  },
  {
    label: '能用样例验证排序前后元素不丢、不多、不乱改。',
    evidence: '能测试重复数字、空列表、已经有序、倒序四种情况。',
    retryHint: '先写输入和期望输出，再运行排序函数对比。',
  },
  {
    label: '能比较 O(n²) 和 O(n log n) 的适用场景。',
    evidence: '能说明小数据可以用简单排序，大数据更适合归并或快速排序。',
    retryHint: '回到“算法对决”，观察数据量变大后步骤数量怎么变化。',
  },
  {
    label: '能把排序策略写成函数并解释核心循环。',
    evidence: '至少能说明一个排序函数的外层循环和内层比较分别负责什么。',
    retryHint: '回到“代码魔法书”，先给每一层循环写一句中文注释。',
  },
];

export const bubbleTraceCode = `numbers = [5, 1, 4, 2, 8]

for i in range(len(numbers) - 1):
    for j in range(len(numbers) - 1 - i):
        if numbers[j] > numbers[j + 1]:
            numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]

print(numbers)`;

const formatPythonList = items => `[${items.join(', ')}]`;

export const bubbleTraceSteps = (() => {
  const numbers = [5, 1, 4, 2, 8];
  const steps = [{
    active: [0],
    vars: { i: '未开始', j: '-', numbers: formatPythonList(numbers) },
    action: '进入第 1 轮',
  }];

  for (let i = 0; i < numbers.length - 1; i += 1) {
    steps.push({
      active: [2],
      vars: { i, j: 0, numbers: formatPythonList(numbers) },
      row: [`第 ${i + 1} 轮开始`, i, '-', formatPythonList(numbers), `右侧已有 ${i} 个元素归位`],
      action: '比较 j = 0',
    });

    for (let j = 0; j < numbers.length - 1 - i; j += 1) {
      const left = numbers[j];
      const right = numbers[j + 1];
      const shouldSwap = left > right;
      steps.push({
        active: [3, 4],
        vars: { i, j, numbers: formatPythonList(numbers) },
        row: [`比较 numbers[${j}] 和 numbers[${j + 1}]`, i, j, `${left} 与 ${right}`, shouldSwap ? '前大后小，交换' : '顺序正确，不交换'],
        action: shouldSwap ? `交换 ${left} 和 ${right}` : (j === numbers.length - 2 - i ? '结束本轮扫描' : `比较 j = ${j + 1}`),
      });

      if (shouldSwap) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
        steps.push({
          active: [5],
          vars: { i, j, numbers: formatPythonList(numbers) },
          row: ['交换后', i, j, formatPythonList(numbers), `${right} 向左，${left} 向右`],
          action: j === numbers.length - 2 - i ? '结束本轮扫描' : `比较 j = ${j + 1}`,
        });
      }
    }

    steps.push({
      active: [3],
      vars: { i, j: numbers.length - 1 - i, numbers: formatPythonList(numbers) },
      exit: i === numbers.length - 2
        ? `第 ${i + 1} 轮结束：最后两个元素也排好，冒泡排序完成。`
        : `第 ${i + 1} 轮结束：${numbers[numbers.length - 1 - i]} 已经在右侧归位，下一轮比较范围变短。`,
      action: i === numbers.length - 2 ? '查看最终输出' : `进入第 ${i + 2} 轮`,
    });
  }

  steps.push({
    active: [7],
    vars: { i: 4, j: '-', numbers: formatPythonList(numbers) },
    action: '显示最终结果',
    output: `排序完成：${formatPythonList(numbers)}`,
  });
  return steps;
})();
