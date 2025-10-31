// constants/registrationFormData.ts
import { RegCourseData, RegistrationFormData } from '@/app/types/sanity'

export const registrationFormTestData: RegistrationFormData = {
  _id: 'test-registration-form',
  title: 'Early Course Registration',
  buttonText: 'Reserve Seat',
  footerText: 'No Credit card is required',
  courses: [
    {
      _id: 'course-1',
      id: 1,
      name: 'Documentary Photography Fundamentals',
      title: 'The complete guide to crafting stunning visuals and impactful stories',
      logo: 'https://cdn.sanity.io/images/0v9eq93x/production/6095157ab57caf1469cfc397b950a238a23b2e39-225x37.svg',
      image: 'https://cdn.sanity.io/images/0v9eq93x/production/5f10f613d5aab4c4203d21f60045c9afc4349700-5760x3240.jpg',
      isAvailable: true,
      statusText: 'Limited Seats Available',
      description: 'The complete guide to crafting stunning visuals and impactful stories',
      price: 779,
      isNew: false,
      included: [
        '80 Videos',
        'Monthly Industry Calls',
        'Savings On Gear & Software',
        'Exclusive Facebook Group',
        'Access to private job postings'
      ]
    },
    {
      _id: 'course-2',
      id: 2,
      name: 'Advanced Cinematography',
      title: 'Your guide to becoming a top-tier, in-demand DP/Cinematographer',
      logo: 'https://cdn.sanity.io/images/0v9eq93x/production/3408feae389ea7d1b600f61317a2a14e29504e27-372x55.svg',
      image: 'https://cdn.sanity.io/images/0v9eq93x/production/4bccba44e0d04b423b2b9c095a537aa7b0ad73c4-5760x3240.jpg',
      isAvailable: true,
      statusText: 'Limited Seats Available',
      description: 'Your guide to becoming a top-tier, in-demand DP/ Cinematographer',
      price: 779,
      isNew: true,
      included: [
        '55+ Videos',
        'Monthly Industry Calls',
        '8 Feedback Sessions with Nik Poleki',
        'Savings On Gear & Software',
        'Cash Prize Contests',
        'Exclusive Facebook Group',
        'Access to private job postings'
      ]
    },
    {
      _id: 'course-3',
      id: 3,
      name: 'Editing Masterclass',
      title: 'Get insider access to making acclaimed films and mastering filmmaking',
      logo: 'https://cdn.sanity.io/images/0v9eq93x/production/29d23aa37ba0bdae1f12e4cbbf3e5d58bb22316f-370x37.svg',
      image: 'https://cdn.sanity.io/images/0v9eq93x/production/b938f8433f79a63d2bca0520a343a776015cfd3e-5760x3240.jpg',
      isAvailable: false,
      statusText: 'Fully Booked',
      description: 'Get insider access to making acclaimed films and mastering filmmaking',
      price: 779,
      isNew: false,
      included: [
        '69 Videos',
        'Monthly Industry Calls',
        'Savings On Gear & Software',
        'Exclusive Facebook Group',
        'Bi-weekly Feedback Calls',
        'Access to private job postings'
      ]
    },
    {
      _id: 'course-4',
      id: 4,
      name: 'Visual Storytelling Techniques',
      title: 'Tell Your Story with Impact',
      logo: 'https://cdn.sanity.io/images/0v9eq93x/production/be07bfd747c0dd4dc86f85a0db747078f081119c-281x37.svg',
      image: 'https://cdn.sanity.io/images/0v9eq93x/production/658013b32d6b8aa179c0f8f0f213bb57e763e8a3-5760x3240.jpg',
      isAvailable: true,
      statusText: 'Limited Seats Available',
      description: 'A step-by-step guide to finishing a film. From finding a story to getting into film festivals.',
      price: 629,
      isNew: false,
      included: [
        '70+ Videos',
        'Monthly Industry Calls',
        'Savings On Gear & Software',
        'Exclusive Facebook Group',
        'Access to private job postings'
      ]
    },
    {
      _id: 'course-5',
      id: 5,
      name: 'Lighting for Film',
      title: 'Master the Art of Lighting',
      logo: 'https://cdn.sanity.io/images/0v9eq93x/production/8cdb9bc322b72d2d0c822f68df008afc70441efc-198x37.svg',
      image: 'https://cdn.sanity.io/images/0v9eq93x/production/47327d7f8d90a5face263286b2de704d5a476894-5760x3240.jpg',
      isAvailable: true,
      statusText: 'Limited Seats Available',
      description: 'The complete guide to building a profitable and thriving film career.',
      price: 679,
      isNew: false,
      included: [
        '75+ Videos',
        'Monthly Industry Calls',
        'Savings On Gear & Software',
        'Exclusive Facebook Group',
        'Access to private job postings'
      ]
    },
    {
      _id: 'course-6',
      id: 6,
      name: 'Directing Documentary Films',
      title: 'Direct with Vision and Purpose',
      logo: 'https://cdn.sanity.io/images/0v9eq93x/production/d46d7f6adea5ef00cde939d6ba905dd210adcb5f-253x37.svg',
      image: 'https://cdn.sanity.io/images/0v9eq93x/production/efe3e4aeaf931edc1d83caa765ecb763e3dd544a-5760x3240.jpg',
      isAvailable: false,
      statusText: 'Coming Soon',
      description: "An expert's guide to fast, flawless, and captivating editing.",
      price: 679,
      isNew: false,
      included: [
        '75+ Videos',
        'Monthly Industry Calls',
        'Savings On Gear & Software',
        'Exclusive Facebook Group',
        'Access to private job postings'
      ]
    },
    {
      _id: 'course-7',
      id: 7,
      name: 'Sound Design Workshop',
      title: 'Sound Matters in Storytelling',
      logo: 'https://cdn.sanity.io/images/0v9eq93x/production/dc5aeec037e4df9659cbfce433e561e6a56f26ca-214x40.svg',
      image: 'https://cdn.sanity.io/images/0v9eq93x/production/e57cad95d56536ebc4da841268c5fb80baf632f2-5760x3240.jpg',
      isAvailable: true,
      statusText: 'New Course',
      description: 'The complete guide to start, fund, manage, and deliver commercial and short film projects.',
      price: 779,
      isNew: true,
      included: [
        '45+ Videos',
        'Monthly Industry Calls',
        '3 two-hour workshops',
        'Savings on Gear & Software',
        'Cash Prize Contests',
        'Exclusive Facebook Group',
        'Access to private job postings'
      ]
    }
  ]
}
