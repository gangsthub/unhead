import type { HeadEntryOptions, MergeHead } from '@unhead/schema'
import type { UseHeadInput } from '../../../'
import { injectHead } from '../../../'

export function serverUseHead<T extends MergeHead>(input: UseHeadInput<T>, options: HeadEntryOptions = {}) {
  const head = injectHead()
  head.push(input, options)
}
