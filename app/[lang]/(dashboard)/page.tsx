"use client";

import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import dynamic from "next/dynamic";
const StandardEditor = dynamic(() => import('@/components/libs/StandardEditor'), { ssr: false });
import { useState } from "react";
const BlankPage = () => {
  const [content, setContent] = useState<any>("")
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Utility</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Blank Page</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900">
        <StandardEditor value={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default BlankPage;
