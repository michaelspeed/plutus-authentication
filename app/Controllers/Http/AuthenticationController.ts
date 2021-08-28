import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import SecurePassword from 'secure-password';
import License from "App/Models/License";
import Package from "App/Models/Package";
import jwt from 'jsonwebtoken'
import {jwtconfig} from "Config/jwtconfig";
import {HttpException} from "@adonisjs/http-server/build/src/Exceptions/HttpException";

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

  public async loginClient(ctx: HttpContextContract) {
    const {email, password} = ctx.request.body();
    const user = await User.findByOrFail('email', email);
    const pwd = new SecurePassword()
    if (user) {
      const passwordBuffer = Buffer.from(password)
      const hashBuff = Buffer.from(user.password, 'base64')
      const validity = await pwd.verify(passwordBuffer, hashBuff);
      console.log(validity)
      if (validity === SecurePassword.VALID) {
        const license = await License.findBy('owner', user.id);
        const employeeLicense = await License.findBy('employeeLicenseId', user.id);
        return {
          user,
          license,
          employeeLicense
        };
      } else {
        throw HttpException.invoke({}, 401, "Invalid email or password")
      }
    } else {
      throw HttpException.invoke({}, 404, "User not found")
    }
  }
}
