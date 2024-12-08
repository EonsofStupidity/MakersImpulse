import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { AdminRoleAssignment, Permission } from "./types";
import { MatrixToolbar } from "./components/MatrixToolbar";
import { MatrixHeader } from "./components/MatrixHeader";
import { MatrixBody } from "./components/MatrixBody";

interface RoleManagementMatrixProps {
  roles: AdminRoleAssignment[];
  onPermissionChange: (roleId: string, permission: { feature: string } & Permission) => void;
}

export const RoleManagementMatrix = ({ roles, onPermissionChange }: RoleManagementMatrixProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { toast } = useToast();

  const features = [
    "Users",
    "Builds",
    "Forum",
    "Content",
    "Components",
    "Settings",
  ];

  const filteredFeatures = features.filter(feature =>
    feature.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedFeatures.length === 0 || selectedFeatures.includes(feature))
  );

  const exportMatrix = () => {
    const csv = [
      ["Feature", ...roles.map(role => role.role)].join(","),
      ...filteredFeatures.map(feature => 
        [feature, ...roles.map(role => 
          role.permissions?.[feature]?.view ? "Yes" : "No"
        )].join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "permissions-matrix.csv";
    a.click();

    toast({
      title: "Export Successful",
      description: "The permissions matrix has been exported to CSV.",
    });
  };

  const handlePermissionChange = (
    roleId: string, 
    feature: string, 
    permissionType: keyof Permission, 
    currentValue: boolean
  ) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    if (role.role === 'super_admin') {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Super Admin permissions cannot be modified.",
      });
      return;
    }

    if (permissionType !== 'view' && !role.permissions?.[feature]?.view) {
      toast({
        variant: "destructive",
        title: "Warning",
        description: "View permission is required for other permissions.",
      });
      return;
    }

    const updatedPermissions = {
      feature,
      view: permissionType === 'view' ? currentValue : role.permissions?.[feature]?.view || false,
      create: permissionType === 'create' ? currentValue : role.permissions?.[feature]?.create || false,
      edit: permissionType === 'edit' ? currentValue : role.permissions?.[feature]?.edit || false,
      delete: permissionType === 'delete' ? currentValue : role.permissions?.[feature]?.delete || false,
    };

    if (permissionType === 'view' && !currentValue) {
      updatedPermissions.create = false;
      updatedPermissions.edit = false;
      updatedPermissions.delete = false;
    }

    onPermissionChange(roleId, updatedPermissions);
  };

  return (
    <Card className="p-6">
      <MatrixToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        features={features}
        selectedFeatures={selectedFeatures}
        onFeatureToggle={(feature, checked) => {
          setSelectedFeatures(checked 
            ? [...selectedFeatures, feature]
            : selectedFeatures.filter(f => f !== feature)
          );
        }}
        onExport={exportMatrix}
      />

      <div className="overflow-x-auto">
        <Table>
          <MatrixHeader roles={roles} />
          <MatrixBody
            roles={roles}
            filteredFeatures={filteredFeatures}
            onPermissionChange={handlePermissionChange}
          />
        </Table>
      </div>
    </Card>
  );
};