import React from "react"

import { AuthContext } from "./Auth.context"

export const useAuthStore = () => React.useContext(AuthContext)
