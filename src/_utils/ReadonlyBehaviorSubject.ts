import type { SafeOmit } from "@sangonz193/utils/SafeOmit"
import type { BehaviorSubject } from "rxjs"

export type ReadonlyBehaviorSubject<T> = SafeOmit<BehaviorSubject<T>, "next">
