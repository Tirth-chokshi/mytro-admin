import Button from "@/components/ui/button"
const PaginationControls = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
    <p className="text-sm  text-center sm:text-left">
      Showing 1 of 50 entries
    </p>
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
      >
        Previous
      </Button>
      {[1, 2, 3].map(page => (
        <Button
          key={page}
          variant="outline"
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
      >
        Next
      </Button>
    </div>
  </div>
);

export default PaginationControls;