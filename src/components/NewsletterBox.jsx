export default function NewsletterBox() {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe Today & Enjoy 20% Off Your Next Purchase!
      </p>
      <p className="text-gray-400 mt-3">
        Sign up for our newsletter to stay informed about our latest offers,
        promotions, and exclusive deals.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input
          id="email"
          name="email"
          required
          type="email"
          placeholder="Enter your email address"
          className="w-full sm:flex-1 outline-none"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4">
          Subscribe
        </button>
      </form>
    </div>
  );
}
