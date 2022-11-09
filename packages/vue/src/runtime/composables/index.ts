import { unpackMeta } from 'zhead'
import { ref, watchEffect } from 'vue'
import type { HeadEntryOptions, MergeHead, MetaFlatInput } from '@unhead/schema'
import { asArray, resolveUnrefHeadInput } from '../../utils'
import type {
  Arrayable,
  Link,
  MaybeComputedRefEntries,
  Meta,
  Noscript,
  ReactiveHead,
  Script,
  Style,
  UseHeadInput,
} from '../../types'
import { IsBrowser } from '../../env'
import { clientUseHead as _clientUseHead } from './useHead/clientUseHead'
import { serverUseHead as _serverUseHead } from './useHead/serverUseHead'

export function useHead<T extends MergeHead>(input: UseHeadInput<T>, options: HeadEntryOptions = {}) {
  if ((options.mode === 'server' && IsBrowser) || (options.mode === 'client' && !IsBrowser))
    return

  IsBrowser ? _clientUseHead(input, options) : _serverUseHead(input, options)
}

export const useTagTitle = (title: ReactiveHead['title']) => useHead({ title })

export const useTitleTemplate = (titleTemplate: ReactiveHead['titleTemplate']) => useHead({ titleTemplate })

export const useTagMeta = (meta: Arrayable<Meta>) => useHead({ meta: asArray(meta) })

export const useTagMetaFlat = (meta: MaybeComputedRefEntries<MetaFlatInput>) => {
  const input: any = ref({})
  watchEffect(() => {
    // need to unref data so we can unpack it properly
    input.value = unpackMeta(resolveUnrefHeadInput(meta))
  })
  return useHead({ meta: input })
}

export const useTagLink = (link: Arrayable<Link>) => useHead({ link: asArray(link) })

export const useTagScript = (script: Arrayable<Script>) => useHead({ script: asArray(script) })

export const useTagStyle = (style: Arrayable<Style>) => useHead({ style: asArray(style) })

export const useTagNoscript = (noscript: Arrayable<Noscript>) => useHead({ noscript: asArray(noscript) })

export const useTagBase = (base: ReactiveHead['base']) => useHead({ base })

export const useHtmlAttrs = (attrs: ReactiveHead['htmlAttrs']) => useHead({ htmlAttrs: attrs })

export const useBodyAttrs = (attrs: ReactiveHead['bodyAttrs']) => useHead({ bodyAttrs: attrs })

export * from './server'