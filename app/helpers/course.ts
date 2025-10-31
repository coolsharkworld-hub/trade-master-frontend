import { CartItem } from "../types/cart"

export const getStateOfCourse = (id: number, boughtCourses: CartItem[], cartItems: CartItem[]) => {
    if (boughtCourses.find(course => course.courseId == id)) return 2
    if (cartItems.find(course => course.courseId == id)) return 1
    return 0
  }