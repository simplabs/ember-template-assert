import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

export default helper(function templateAssert([message, condition]) {
  assert(message, condition);
});
