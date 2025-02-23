/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PageData {
  payload: {
    head_menu: any
    bloc_1: {
      title: string
      subtitle: string
      cases: {
        category: string
        cta: string
        description: string
        tagline: string
      }[]
    }
    bloc_2: {
      title: string
      cases: string[]
    }
    bloc_3: {
      title: string
      more_info: string
      cases: {
        category: string
        tagline: string
        description: string
      }[]
    }
    bloc_4: {
      pictos: { title: string; description: string }[]
      subtitle: string
      text: string
      title: string
      text_title: string
    }
    bloc_2_2: {
      btn_1: string[]
      btn_2: string[]
      btn_3: string
      btn_4: string[]
      btn_5: string
      btn_6: string
      title: string
    }
  }[]
}
