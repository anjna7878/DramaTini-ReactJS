import React, { Component } from "react";
import zxcvbn from "zxcvbn";

class PasswordStrengthMeter extends Component {
  createPasswordLabel = result => {
    switch (result.score) {
      case 0:
        return "Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  };

  render() {
    const { password } = this.props;
    const testedResult = zxcvbn(password);
  
    return (
      <>
        {password && password.length > 5 && password.length < 25 && (
          <>
            <div className="password-strength-meter">
              <progress
                className={`password-strength-meter-progress strength-${this.createPasswordLabel(
                  testedResult
                )}`}
                value={testedResult.score}
                max="4"
              />
              <span
                className={`meter-text strength-${this.createPasswordLabel(
                  testedResult
                )}`}
              >
                <strong> {this.createPasswordLabel(testedResult)}</strong>
              </span>
            </div>
          </>
        )}
      </>
    );
  }
}

export default PasswordStrengthMeter;
