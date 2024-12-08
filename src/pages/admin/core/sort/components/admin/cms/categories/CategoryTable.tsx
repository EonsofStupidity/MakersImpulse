import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Category } from "./types";

interface CategoryTableProps {
  categories: Category[];
}

export const CategoryTable = ({ categories }: CategoryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(categories || []).map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>
              {new Date(category.created_at!).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};