# -*- coding: utf-8 -*- #
# Copyright 2015 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Helpers for interacting with the Cloud Dataflow API."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from apitools.base.py import exceptions as apitools_exceptions

from googlecloudsdk.api_lib.util import apis
from googlecloudsdk.api_lib.util import exceptions
from googlecloudsdk.core import properties
import six

DATAFLOW_API_NAME = 'dataflow'
DATAFLOW_API_VERSION = 'v1b3'
# TODO(b/139889563): Remove when dataflow args region is changed to required
DATAFLOW_API_DEFAULT_REGION = 'us-central1'


def GetMessagesModule():
  return apis.GetMessagesModule(DATAFLOW_API_NAME, DATAFLOW_API_VERSION)


def GetClientInstance():
  return apis.GetClientInstance(DATAFLOW_API_NAME, DATAFLOW_API_VERSION)


def GetProject():
  return properties.VALUES.core.project.Get(required=True)


class Jobs(object):
  """The Jobs set of Dataflow API functions."""

  GET_REQUEST = GetMessagesModule().DataflowProjectsLocationsJobsGetRequest
  LIST_REQUEST = GetMessagesModule().DataflowProjectsLocationsJobsListRequest
  AGGREGATED_LIST_REQUEST = GetMessagesModule(
  ).DataflowProjectsJobsAggregatedRequest
  UPDATE_REQUEST = GetMessagesModule(
  ).DataflowProjectsLocationsJobsUpdateRequest

  @staticmethod
  def GetService():
    return GetClientInstance().projects_locations_jobs

  @staticmethod
  def Get(job_id, project_id=None, region_id=None, view=None):
    """Calls the Dataflow Jobs.Get method.

    Args:
      job_id: Identifies a single job.
      project_id: The project which owns the job.
      region_id: The regional endpoint where the job lives.
      view: (DataflowProjectsJobsGetRequest.ViewValueValuesEnum) Level of
        information requested in response.

    Returns:
      (Job)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    request = GetMessagesModule().DataflowProjectsLocationsJobsGetRequest(
        jobId=job_id, location=region_id, projectId=project_id, view=view)
    try:
      return Jobs.GetService().Get(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)

  @staticmethod
  def Cancel(job_id, project_id=None, region_id=None):
    """Cancels a job by calling the Jobs.Update method.

    Args:
      job_id: Identifies a single job.
      project_id: The project which owns the job.
      region_id: The regional endpoint where the job lives.

    Returns:
      (Job)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    job = GetMessagesModule().Job(
        requestedState=(GetMessagesModule().Job.RequestedStateValueValuesEnum
                        .JOB_STATE_CANCELLED))
    request = GetMessagesModule().DataflowProjectsLocationsJobsUpdateRequest(
        jobId=job_id, location=region_id, projectId=project_id, job=job)
    try:
      return Jobs.GetService().Update(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)

  @staticmethod
  def Drain(job_id, project_id=None, region_id=None):
    """Drains a job by calling the Jobs.Update method.

    Args:
      job_id: Identifies a single job.
      project_id: The project which owns the job.
      region_id: The regional endpoint where the job lives.

    Returns:
      (Job)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    job = GetMessagesModule().Job(
        requestedState=(GetMessagesModule().Job.RequestedStateValueValuesEnum
                        .JOB_STATE_DRAINED))
    request = GetMessagesModule().DataflowProjectsLocationsJobsUpdateRequest(
        jobId=job_id, location=region_id, projectId=project_id, job=job)
    try:
      return Jobs.GetService().Update(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)

  @staticmethod
  def Snapshot(job_id,
               project_id=None,
               region_id=None,
               ttl='604800s',
               snapshot_sources=False):
    """Takes a snapshot of a job via the Jobs.Snapshot method.

    Args:
      job_id: Identifies a single job.
      project_id: The project which owns the job.
      region_id: The regional endpoint where the job lives.
      ttl: The ttl for the snapshot.
      snapshot_sources: If true, the sources will be snapshotted.

    Returns:
      (Snapshot)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    request = GetMessagesModule().DataflowProjectsLocationsJobsSnapshotRequest(
        jobId=job_id,
        location=region_id,
        projectId=project_id,
        snapshotJobRequest=GetMessagesModule().SnapshotJobRequest(
            location=region_id, ttl=ttl, snapshotSources=snapshot_sources),
        )
    try:
      return Jobs.GetService().Snapshot(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)


class Metrics(object):
  """The Metrics set of Dataflow API functions."""

  GET_REQUEST = GetMessagesModule(
  ).DataflowProjectsLocationsJobsGetMetricsRequest

  @staticmethod
  def GetService():
    return GetClientInstance().projects_locations_jobs

  @staticmethod
  def Get(job_id, project_id=None, region_id=None, start_time=None):
    """Calls the Dataflow Metrics.Get method.

    Args:
      job_id: The job to get messages for.
      project_id: The project which owns the job.
      region_id: The regional endpoint of the job.
      start_time: Return only metric data that has changed since this time.
        Default is to return all information about all metrics for the job.

    Returns:
      (MetricUpdate)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    request = GetMessagesModule(
    ).DataflowProjectsLocationsJobsGetMetricsRequest(
        jobId=job_id,
        location=region_id,
        projectId=project_id,
        startTime=start_time)
    try:
      return Metrics.GetService().GetMetrics(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)


class TemplateArguments(object):
  """Wrapper class for template arguments."""

  project_id = None
  region_id = None
  gcs_location = None
  job_name = None
  zone = None
  max_workers = None
  num_workers = None
  network = None
  subnetwork = None
  worker_machine_type = None
  staging_location = None
  kms_key_name = None
  disable_public_ips = None
  parameters = None
  service_account_email = None

  def __init__(self,
               project_id=None,
               region_id=None,
               job_name=None,
               gcs_location=None,
               zone=None,
               max_workers=None,
               num_workers=None,
               network=None,
               subnetwork=None,
               worker_machine_type=None,
               staging_location=None,
               kms_key_name=None,
               disable_public_ips=None,
               parameters=None,
               service_account_email=None):
    self.project_id = project_id
    self.region_id = region_id
    self.job_name = job_name
    self.gcs_location = gcs_location
    self.zone = zone
    self.max_workers = max_workers
    self.num_workers = num_workers
    self.network = network
    self.subnetwork = subnetwork
    self.worker_machine_type = worker_machine_type
    self.staging_location = staging_location
    self.kms_key_name = kms_key_name
    self.disable_public_ips = disable_public_ips
    self.parameters = parameters
    self.service_account_email = service_account_email


class Templates(object):
  """The Templates set of Dataflow API functions."""

  CREATE_REQUEST = GetMessagesModule().CreateJobFromTemplateRequest
  LAUNCH_FLEX_TEMPLATE_REQUEST = GetMessagesModule().LaunchFlexTemplateRequest
  PARAMETERS_VALUE = CREATE_REQUEST.ParametersValue
  FLEX_TEMPLATE_PARAMETER = GetMessagesModule().LaunchFlexTemplateParameter
  FLEX_TEMPLATE_PARAMETERS_VALUE = FLEX_TEMPLATE_PARAMETER.ParametersValue

  @staticmethod
  def GetService():
    return GetClientInstance().projects_locations_templates

  @staticmethod
  def GetFlexTemplateService():
    return GetClientInstance().projects_locations_flexTemplates

  @staticmethod
  def Create(template_args=None):
    """Calls the Dataflow Templates.CreateFromJob method.

    Args:
      template_args: Arguments for create template.

    Returns:
      (Job)
    """
    params_list = []
    parameters = template_args.parameters
    for k, v in six.iteritems(parameters) if parameters else {}:
      params_list.append(
          Templates.PARAMETERS_VALUE.AdditionalProperty(key=k, value=v))

    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = template_args.region_id or DATAFLOW_API_DEFAULT_REGION

    ip_configuration_enum = GetMessagesModule(
    ).RuntimeEnvironment.IpConfigurationValueValuesEnum
    ip_private = ip_configuration_enum.WORKER_IP_PRIVATE
    ip_configuration = ip_private if template_args.disable_public_ips else None

    body = Templates.CREATE_REQUEST(
        gcsPath=template_args.gcs_location,
        jobName=template_args.job_name,
        location=region_id,
        environment=GetMessagesModule().RuntimeEnvironment(
            serviceAccountEmail=template_args.service_account_email,
            zone=template_args.zone,
            maxWorkers=template_args.max_workers,
            numWorkers=template_args.num_workers,
            network=template_args.network,
            subnetwork=template_args.subnetwork,
            machineType=template_args.worker_machine_type,
            tempLocation=template_args.staging_location,
            kmsKeyName=template_args.kms_key_name,
            ipConfiguration=ip_configuration),
        parameters=Templates.PARAMETERS_VALUE(additionalProperties=params_list)
        if parameters else None)
    request = GetMessagesModule(
    ).DataflowProjectsLocationsTemplatesCreateRequest(
        projectId=template_args.project_id or GetProject(),
        location=region_id,
        createJobFromTemplateRequest=body)

    try:
      return Templates.GetService().Create(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)

  @staticmethod
  def __ConvertArgumentsParameters(template_args):
    """Converts template arguments to parameters.

    Args:
      template_args: Arguments for create job using template.

    Returns:
      List of Templates.FLEX_TEMPLATE_PARAMETERS_VALUE.AdditionalProperty
    """
    params_list = []
    parameters = template_args.parameters
    for k, v in six.iteritems(parameters) if parameters else {}:
      params_list.append(
          Templates.FLEX_TEMPLATE_PARAMETERS_VALUE.AdditionalProperty(
              key=k, value=v))

    return params_list

  @staticmethod
  def __ValidateFlexTemplateArgs(template_args):
    """Validates flex template arguments.

    Args:
      template_args: Arguments for create job using template.

    Returns:
      True if the arguments are valid and False otherwise. For flex templates
      all the pipeline options should be passed via parameters because they
      can vary across languages and sdk versions.
    """
    error = None

    if (template_args.zone or template_args.max_workers or
        template_args.num_workers or template_args.network or
        template_args.subnetwork or template_args.worker_machine_type or
        template_args.staging_location or template_args.kms_key_name or
        template_args.service_account_email or
        template_args.disable_public_ips):
      error = (
          'All pipeline options should be passed via parameters flag for '
          'Flex templates. Use right casing format according to the sdk. '
          'Example: --parameters=maxNumWorkers=5 for java sdk 1.X and '
          '--parameters=max_num_workers=5 for python sdk.\n'
          'For all the parameter options please refer '
          'https://cloud.google.com/dataflow/docs/guides/specifying-exec-params'
      )
    return error

  @staticmethod
  def CreateJobFromFlexTemplate(template_args=None):
    """Call the create job from flex template APIs.

    Args:
      template_args: Arguments for create template.

    Returns:
      (Job)
    """
    validation_error = Templates.__ValidateFlexTemplateArgs(template_args)
    if validation_error:
      raise ValueError(validation_error)

    params_list = Templates.__ConvertArgumentsParameters(template_args)

    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = template_args.region_id or DATAFLOW_API_DEFAULT_REGION

    body = Templates.LAUNCH_FLEX_TEMPLATE_REQUEST(
        launchParameter=Templates.FLEX_TEMPLATE_PARAMETER(
            jobName=template_args.job_name,
            containerSpecGcsPath=template_args.gcs_location,
            parameters=Templates.FLEX_TEMPLATE_PARAMETERS_VALUE(
                additionalProperties=params_list) if params_list else None))
    request = GetMessagesModule(
    ).DataflowProjectsLocationsFlexTemplatesLaunchRequest(
        projectId=template_args.project_id or GetProject(),
        location=region_id,
        launchFlexTemplateRequest=body)
    try:
      return Templates.GetFlexTemplateService().Launch(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)


class Messages(object):
  """The Messages set of Dataflow API functions."""

  LIST_REQUEST = GetMessagesModule(
  ).DataflowProjectsLocationsJobsMessagesListRequest

  @staticmethod
  def GetService():
    return GetClientInstance().projects_locations_jobs_messages

  @staticmethod
  def List(job_id,
           project_id=None,
           region_id=None,
           minimum_importance=None,
           start_time=None,
           end_time=None,
           page_size=None,
           page_token=None):
    """Calls the Dataflow Metrics.Get method.

    Args:
      job_id: The job to get messages about.
      project_id: The project which owns the job.
      region_id: The regional endpoint of the job.
      minimum_importance: Filter to only get messages with importance >= level
      start_time: If specified, return only messages with timestamps >=
        start_time. The default is the job creation time (i.e. beginning of
        messages).
      end_time: Return only messages with timestamps < end_time. The default is
        now (i.e. return up to the latest messages available).
      page_size: If specified, determines the maximum number of messages to
        return.  If unspecified, the service may choose an appropriate default,
        or may return an arbitrarily large number of results.
      page_token: If supplied, this should be the value of next_page_token
        returned by an earlier call. This will cause the next page of results to
        be returned.

    Returns:
      (ListJobMessagesResponse)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    request = GetMessagesModule(
    ).DataflowProjectsLocationsJobsMessagesListRequest(
        jobId=job_id,
        location=region_id,
        projectId=project_id,
        startTime=start_time,
        endTime=end_time,
        minimumImportance=minimum_importance,
        pageSize=page_size,
        pageToken=page_token)
    try:
      return Messages.GetService().List(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)


class Snapshots(object):
  """Cloud Dataflow snapshots api."""

  @staticmethod
  def GetService():
    return GetClientInstance().projects_locations_snapshots

  @staticmethod
  def Delete(snapshot_id=None, project_id=None, region_id=None):
    """Calls the Dataflow Snapshots.Delete method.

    Args:
      snapshot_id: The id of the snapshot to delete.
      project_id: The project that owns the snapshot.
      region_id: The regional endpoint of the snapshot.

    Returns:
      (DeleteSnapshotResponse)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    request = GetMessagesModule(
    ).DataflowProjectsLocationsSnapshotsDeleteRequest(
        snapshotId=snapshot_id, location=region_id, projectId=project_id)
    try:
      return Snapshots.GetService().Delete(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)

  @staticmethod
  def Get(snapshot_id=None, project_id=None, region_id=None):
    """Calls the Dataflow Snapshots.Get method.

    Args:
      snapshot_id: The id of the snapshot to get.
      project_id: The project that owns the snapshot.
      region_id: The regional endpoint of the snapshot.

    Returns:
      (GetSnapshotResponse)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    request = GetMessagesModule().DataflowProjectsLocationsSnapshotsGetRequest(
        snapshotId=snapshot_id, location=region_id, projectId=project_id)
    try:
      return Snapshots.GetService().Get(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)

  @staticmethod
  def List(job_id=None, project_id=None, region_id=None):
    """Calls the Dataflow Snapshots.List method.

    Args:
      job_id: If specified, only snapshots associated with the job will be
        returned.
      project_id: The project that owns the snapshot.
      region_id: The regional endpoint of the snapshot.

    Returns:
      (ListSnapshotsResponse)
    """
    project_id = project_id or GetProject()
    # TODO(b/139889563): Remove default when args region is changed to required
    region_id = region_id or DATAFLOW_API_DEFAULT_REGION
    request = GetMessagesModule().DataflowProjectsLocationsSnapshotsListRequest(
        jobId=job_id, location=region_id, projectId=project_id)
    try:
      return Snapshots.GetService().List(request)
    except apitools_exceptions.HttpError as error:
      raise exceptions.HttpException(error)
