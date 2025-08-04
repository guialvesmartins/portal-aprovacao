import { Fragment } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { MenuList } from "./MenuList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type Props = {
  className?: string;
};

export default function BreadcrumbNav({ className }: Props) {
  const breadcrumbs = useBreadcrumbs();

  function buscarNomeRota(rota: string) {
    return MenuList.find((x) => x.to === rota);
  }

  return (
    <div className={["mt-4 ml-4 text-accent-foreground", className].filter(Boolean).join(" ")}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/" className="text-accent-foreground cursor-pointer">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((breadcrumb) => {
            const rota = buscarNomeRota(breadcrumb.match.pathname);
            return rota ? (
              <Fragment key={breadcrumb.key}>
                <BreadcrumbSeparator className="text-accent-foreground" />
                <BreadcrumbItem>
                  <BreadcrumbLink to={rota.to} className="text-accent-foreground cursor-pointer">
                    {rota.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            ) : null;
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
