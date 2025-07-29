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
  classname?: string;
};

export default function BreadcrumbNav({ classname }: Props) {
  const breadcrumbs = useBreadcrumbs();

  function buscarNomeRota(rota: string) {
    return MenuList.find((x) => x.to === rota);
  }

  return (
    <div className={`mt-4 ml-4 text-accent-foreground ${classname}`.trim()}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/dashboard" className="text-accent-foreground  cursor-pointer">
              Fieg
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((breadcrumb) => {
            const rota = buscarNomeRota(breadcrumb.match.pathname);
            return rota ? (
              <>
                <BreadcrumbSeparator className="text-accent-foreground " />
                <BreadcrumbItem key={breadcrumb.key}>
                  <BreadcrumbLink to={rota.to} className="text-accent-foreground cursor-pointer">
                    {rota.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : null;
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
