
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Label } from 'light-ui'
import locales from 'LOCALES'
import styles from '../Resume/shared/common.css'
import AsyncGithub from '../shared/AsyncGithub'
import Icon from 'COMPONENTS/Icon'

const resumeLocales = locales('resume')

class ResumeUIWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGithub: false
    }
    this.changeShowGithub = this.changeShowGithub.bind(this)
  }

  changeShowGithub(showGithub) {
    this.setState({ showGithub })
  }

  getSectionTitle(section) {
    const { resume } = this.props
    const { info } = resume
    const { freshGraduate } = info
    const { title, subTitle } = resumeLocales.sections[section]
    const result = freshGraduate ? subTitle : title
    return result || title
  }

  renderEducations() {
    return null
  }

  renderWorkExperiences() {
    return null
  }

  renderPersonalProjects() {
    return null
  }

  renderSupplements() {
    return null
  }

  renderSocialLinks() {
    return null
  }

  renderUpdateTime() {
    const { resume, updateText, fromDownload } = this.props
    const { updateAt } = resume
    if (!updateAt || fromDownload) return false
    return {
      updateAt,
      updateText
    }
  }

  renderCustomModules() {
    const { resume } = this.props
    const { customModules = [] } = resume
    return customModules.map((module, index) => this.renderCustomModule(module, index))
  }

  renderCustomModule(module, key) {
    return null
  }

  renderResumeSections() {
    const { resume } = this.props
    const { info } = resume
    const { freshGraduate } = info
    let sectionFuncs = []
    if (freshGraduate) {
      sectionFuncs = [
        this.renderEducations,
        this.renderWorkExperiences,
        this.renderPersonalProjects,
        this.renderCustomModules,
        this.renderSupplements,
        this.renderSocialLinks
      ]
    } else {
      sectionFuncs = [
        this.renderWorkExperiences,
        this.renderPersonalProjects,
        this.renderEducations,
        this.renderCustomModules,
        this.renderSupplements,
        this.renderSocialLinks
      ]
    }
    return sectionFuncs.map((func, index) => func && func.call(this, index))
  }

  renderGitHub() {
    const { showGithub } = this.state
    const { shareInfo, login } = this.props
    const { useGithub, github } = shareInfo

    return useGithub && showGithub ? (
      <div className={styles.container}>
        <div className={styles.github_wrapper}>
          <a
            onClick={() => this.changeShowGithub(false)}
            className={cx(
              styles.baseLink,
              styles.baseInfo,
              styles.githubBack
            )}
          >
            <Icon icon="arrow-left" />
            {resumeLocales.options.back}
          </a>
          <AsyncGithub
            isShare
            login={login}
            githubSection={github}
            cardClass={styles.githubCard}
          />
        </div>
      </div>
    ) : null
  }

  renderLanguages(labelProps = {}) {
    const { resume } = this.props
    const { info } = resume
    const resumeInfo = info || {}
    const { languages = [] } = resumeInfo

    const labels = languages.map((language, i) => (
      <Label
        min
        key={i}
        theme="flat"
        color="light"
        text={language}
        clickable={false}
        className={styles.label}
        {...labelProps}
      />
    ))

    return (
      <div className={styles.labelContainer}>
        {labels}
      </div>
    )
  }
}

ResumeUIWrapper.propTypes = {
  resume: PropTypes.object,
  shareInfo: PropTypes.object,
  login: PropTypes.string
}

ResumeUIWrapper.defaultProps = {
  resume: {},
  login: '',
  shareInfo: {}
}

export default ResumeUIWrapper
