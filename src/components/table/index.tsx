import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const MainTable = ({
  children,
  cols,
}: {
  children: React.ReactNode;
  cols: string[];
}) => {
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {cols.map((element, idx) => (
                <TableHead key={idx}>{element}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      </div>
    </>
  );
};

export default MainTable;
