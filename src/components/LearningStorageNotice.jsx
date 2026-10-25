import { useEffect, useState } from 'react';
import { LEARNING_DATA_EVENT, hasLearningStorageError } from '../utils/learningData';
export default function LearningStorageNotice() {
  const [failed, setFailed] = useState(hasLearningStorageError);
  useEffect(() => {
    const refresh = () => setFailed(hasLearningStorageError());
    window.addEventListener(LEARNING_DATA_EVENT, refresh);
    return () => window.removeEventListener(LEARNING_DATA_EVENT, refresh);
  }, []);
  return failed ? <div role="alert" className="fixed inset-x-4 bottom-4 z-[110] mx-auto max-w-xl rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 shadow-lg">学习记录未能保存。请检查浏览器存储权限或空间，恢复后重新操作；刷新前请另行保留本次作答。</div> : null;
}
