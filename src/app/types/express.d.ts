declare global {
  namespace Express {
    interface Request {
      // এখানে user প্রপার্টির টাইপ সুনির্দিষ্টভাবে সেট করা হলো
      user: IAuthUser;
    }
  }
}