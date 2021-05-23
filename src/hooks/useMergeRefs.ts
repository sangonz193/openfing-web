import { useMemo } from "react"

// https://github.com/react-restart/hooks/blob/master/src/useMergedRefs.ts

type CallbackRef<T> = (ref: T | null) => void
type Ref<T> = React.MutableRefObject<T> | CallbackRef<T>

const toFnRef = <T>(ref?: Ref<T> | null) =>
	!ref || typeof ref === "function"
		? ref
		: (value: T) => {
				ref.current = value
		  }

export function mergeRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
	const a = toFnRef(refA)
	const b = toFnRef(refB)
	return (value: T | null) => {
		if (a) {
			a(value as T)
		}
		if (b) {
			b(value as T)
		}
	}
}

/**
 * Create and returns a single callback ref composed from two other Refs.
 *
 * ```tsx
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * ```
 *
 * @param refA A Callback or mutable Ref
 * @param refB A Callback or mutable Ref
 * @category refs
 */
export function useMergedRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
	return useMemo(() => mergeRefs(refA, refB), [refA, refB])
}
