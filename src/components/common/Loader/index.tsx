interface LoaderProps {
  fullWidth?: boolean;
}
const Loader: React.FC<LoaderProps> = ({ fullWidth = false }) => {
  return (
    <div className={`flex ${fullWidth ? 'h-screen ' : 'h-100'}  items-center justify-center bg-transparent`}>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
