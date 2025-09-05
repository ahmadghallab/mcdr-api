import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AuthAdmin } from "../auth/auth-admin.decorator";
import { Admin } from "./entities/admin.entity";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { AllRoles, Roles } from "../auth/roles.decorator";
import { AdminRole } from "src/core/common/enums/admin-role.enum";
import { RolesGuard } from "../auth/roles.guard";

@UseGuards(RolesGuard)
@Roles(AdminRole.Owner)
@Controller()
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll(
    @AuthAdmin() adminDto: Admin,
  ) {
    return this.adminsService.findAll(adminDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Post('change-password')
  @AllRoles()
  changePassword(
    @AuthAdmin() adminDto: Admin, 
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.adminsService.changePassword(+adminDto.id, changePasswordDto);
  }

  @Post(':id/reset-password')
  resetPassword(@Param('id') id: string) {
    return this.adminsService.resetPassword(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}