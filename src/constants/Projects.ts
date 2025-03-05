export interface IProject {
  id: number;
  name: string;
  image: string;
}

export const PROJECTS: IProject[] = [
  {
    id: 1,
    name: 'Project 1',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
  },
  {
    id: 2,
    name: 'Project 2',
    image:
      'https://fastly.picsum.photos/id/667/800/400.jpg?hmac=-NMFrqGRBNX5p0T1mrTlxEsr_6BtJV3MnEnrNrP8Awg',
  },
  {
    id: 3,
    name: 'Project 3',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  },
  {
    id: 4,
    name: 'Project 4',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  },
];
