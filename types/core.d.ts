/// <reference types="node" />
/// <reference types="next" />
/// <reference types="next/image-types/global" />

//
// Core

declare namespace Core {
  type Layout<T = any> = {
    params: T
    children: React.ReactNode
  }

  type Page<TParams = any, TSearchParams = any> = {
    params: TParams
    searchParams: TSearchParams
  }
}
