import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import SecurePassword from 'secure-password';
import License from "App/Models/License";
import Package from "App/Models/Package";
import jwt from 'jsonwebtoken'
import {jwtconfig} from "Config/jwtconfig";

export default class AuthenticationController {

  public async startLicense(ctx: HttpContextContract) {
    const {name, email, password, licenceClassType, licenseTimerType, pkg} = ctx.request.body()
    const hashedPassword = await SecurePassword.hash(password)
    const user = new User();
    user.email = email
    user.username = name
    user.password = hashedPassword
    const insertUser = await User.create(user);
    const packageMain = await Package.findByOrFail('id', pkg)
    const license = await License.create({
      licenseTimeType: licenseTimerType,
      licenseClassType: licenceClassType,
    })
    await license.related('owner').associate(user);
    await license.related('package').associate(packageMain);
    const token = jwt.sign(license, jwtconfig.key, {expiresIn: '30d'});
    return {
      user: insertUser,
      token
    }
  }
}
