"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { ResultPanel } from "@/components/ui/result-panel";
import { formatCurrency } from "@/lib/formatting";

type ExampleFields = { product: string; unit: string };

export function FoundationPreview() {
  const [status, setStatus] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExampleFields>({
    defaultValues: { product: "", unit: "box" },
  });

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Card id="form-preview" title="Clear inputs. Helpful feedback." description="Shared form controls with labels, hints, validation, and keyboard focus.">
          <form noValidate onSubmit={handleSubmit(() => setStatus("Example checked. No data was submitted."), () => setStatus(""))} className="space-y-5">
            <InputField id="example-product" label="Example product" hint="For preview only. Stays in this browser tab." placeholder="e.g., Nitrile gloves" required maxLength={120} error={errors.product?.message}
              {...register("product", { required: "Enter an example product name.", maxLength: { value: 120, message: "Use 120 characters or fewer." } })} />
            <SelectField id="example-unit" label="Unit of measurement" {...register("unit")}>
              <option value="box">Box</option><option value="gallon">Gallon</option><option value="each">Each</option>
            </SelectField>
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Check example</Button>
              <Button variant="secondary" onClick={() => { reset(); setStatus(""); }}>Reset</Button>
            </div>
            <p role="status" className="min-h-6 text-sm leading-6 text-muted">{status}</p>
          </form>
        </Card>
        <ResultPanel id="result-preview" title="Numbers with context" description="Illustrative fixed values to review the result component. This is not a working calculator." results={[
          { label: "Example monthly amount", value: formatCurrency(248.5), note: "USD · illustrative only" },
          { label: "Example percentage", value: "25.00%", note: "The label and explanation always travel with the number." },
        ]} />
      </div>
      <Card id="table-preview" title="Readable details" description="A reusable table with a caption, row headings, and a keyboard-accessible scroll area on small screens.">
        <DataTable caption="Illustrative supply rows" columns={[
          { key: "name", label: "Product" }, { key: "unit", label: "Unit" }, { key: "cost", label: "Example unit cost (USD)", numeric: true },
        ]} rows={[
          { id: "gloves", cells: { name: "Nitrile gloves", unit: "Box", cost: formatCurrency(12.5) } },
          { id: "cleaner", cells: { name: "All-purpose cleaner", unit: "Gallon", cost: formatCurrency(18) } },
        ]} />
        <p className="mt-4 text-sm leading-6 text-muted">Example prices show formatting only; they are not recommended costs or industry benchmarks.</p>
      </Card>
      <Card id="state-preview" title="Consistent states" description="Controls retain their labels and communicate when an action is unavailable or in progress.">
        <div className="flex flex-wrap gap-3">
          <Button disabled>Unavailable example</Button>
          <Button loading pendingLabel="Working…">Pending example</Button>
          <Button variant="secondary" disabled>Secondary unavailable</Button>
        </div>
      </Card>
    </div>
  );
}
