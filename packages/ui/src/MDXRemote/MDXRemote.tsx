'use client'

import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { MDXRemote as Raw } from 'next-mdx-remote'

export default function MDXRemote({ mdx }: { mdx: MDXRemoteSerializeResult }) {
  return <Raw {...mdx} />
}
