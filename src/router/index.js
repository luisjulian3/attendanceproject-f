import { createRouter, createWebHistory } from 'vue-router'
import LoginPageVue from '@/pages/LoginPage.vue'
import HomePageVue from '@/pages/HomePage.vue'
import ProfilePageVue from '@/pages/ProfilePage.vue'
import AttendanceRegistPageVue from '@/pages/AttendanceRegistPage.vue'
import AdminPage from '@/pages/AdminPage.vue'
import AdminRegistPage from '@/pages/admin/RegistMember.vue'
import AdminAttendanceLogPage from '@/pages/admin/MemberAttendanceLog.vue'
import AttendancePage from '@/pages/AttendancePage.vue'
import AttendancePageIn from '@/pages/attendance/AttendanceIn.vue'
import AttendancePageOut from '@/pages/attendance/AttendanceOut.vue'
import AttendancePageLog from '@/pages/attendance/AttendanceLog.vue'
import DashboardPageVue from '@/pages/DashboardPage.vue'
import UpdateMemberPage from '@/pages/admin/UpdateMember.vue'
import MemberProfileLogPage from '@/pages/admin/MemberProfileLog.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPageVue
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPageVue
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePageVue
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePageVue
    },
    {
      path: '/attendregist',
      name: 'AttendanceRegister',
      component: AttendanceRegistPageVue
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/su/regist',
      name: 'AdminRegistPage',
      component: AdminRegistPage
    },
    {
      path: '/su/attendancelog',
      name: 'AdminAttendanceLogPage',
      component: AdminAttendanceLogPage
    },
    {
      path: '/su/profilelog',
      name: 'MemberProfilepage',
      component: MemberProfileLogPage
    },
    {
      path: '/su/updatemember',
      name: 'UpdateMemberPage',
      component: UpdateMemberPage
    },
    {
      path: '/attendance',
      name: 'AttendancePage',
      component: AttendancePage
    },
    {
      path: '/attendance/in',
      name: 'AttendancePageIn',
      component: AttendancePageIn
    },
    {
      path: '/attendance/out',
      name: 'AttendancePageOut',
      component: AttendancePageOut
    },
    {
      path: '/attendance/log',
      name: 'AttendancePageLog',
      component: AttendancePageLog
    }
  ]
})

export default router
