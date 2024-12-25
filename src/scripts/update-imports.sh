#!/bin/bash
find ./src -type f -name "*.ts*" -exec sed -i 's|@/types/theme/core/types|@/types|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i 's|@/types/theme|@/types|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i 's|@/types/builds|@/types|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i 's|@/types/database/theme|@/types|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i 's|@/types/state/theme|@/types|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i 's|@/types/settings/core/types|@/types|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i 's|@/types/styles/theme|@/types|g' {} \;
find ./src -type f -name "*.ts*" -exec sed -i 's|@/types/animations/theme|@/types|g' {} \;